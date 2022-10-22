import json
from datetime import datetime

from apiauth.models import User
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

from api.models import HealthData


class HealthDataConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = "session_%s" % self.room_name
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)


    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)

        student_id = text_data_json.get("student_id", None)
        if student_id is None:
            return

        heart_rate = text_data_json.get("heart_rate", None)
        temperature = text_data_json.get("temperature", None)
        time_stamp = text_data_json.get("time_stamp", datetime.now())

        try:
            user = await database_sync_to_async(User.objects.get)(id=student_id)
            if user is None:
                return
            await database_sync_to_async(HealthData.objects.create)(
              user=user,
              heart_rate=heart_rate,
              temperature=temperature,
              time_stamp=time_stamp,
            )
        except Exception as e:
            print(e)
            return

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name, {
                "type": "send_health_data",
                "student_id": student_id,
                "heart_rate": heart_rate,
                "temperature": temperature,
                "time_stamp": time_stamp,
            }
        )

    # Receive message from room group
    async def send_health_data(self, event):
        student_id = event["student_id"]
        heart_rate = event["heart_rate"]
        temperature = event["temperature"]
        time_stamp = event["time_stamp"]

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            "student_id": student_id,
            "heart_rate": heart_rate,
            "temperature": temperature,
            "time_stamp": time_stamp,
        }))
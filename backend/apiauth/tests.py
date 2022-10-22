from django.test.utils import override_settings
from django.urls import reverse
from rest_framework import status, test

from .models import User


class RegisterTest(test.APITestCase):
    def setUp(self):
        self.url = reverse("account_register")
        self.username = "testuser"
        self.email = "testuser@domain.com"
        self.password = "testPassword123!"

    def test_create_user(self):
        """
        Ensure we can create a new user object.
        """
        data = {
            "email": self.email,
            "username": self.username,
            "password1": self.password,
            "password2": self.password,
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().email, self.email)

    def test_create_user_with_unmatch_password(self):
        """
        Ensure we cannot create a new user object.
        """
        data = {
            "email": self.email,
            "username": self.username,
            "password1": self.password,
            "password2": self.password + "invalid",
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 0)

    def test_create_user_with_existing_email(self):
        """
        Ensure we cannot create user with an email already registered.
        """
        data = {
            "email": self.email,
            "username": self.username,
            "password1": self.password,
            "password2": self.password,
        }
        self.client.post(self.url, data, format="json")

        duplicate_email_data = {
            "email": self.email,
            "username": self.username + "2",
            "password1": self.password,
            "password2": self.password,
        }
        response = self.client.post(self.url, duplicate_email_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)


class CheckUserTest(test.APITestCase):
    def setUp(self):
        url = reverse("account_register")
        data = {
            "email": "test@leadsnow.net",
            "username": "test_user",
            "password1": "testPassword123!",
            "password2": "testPassword123!",
        }
        self.client.post(url, data, format="json")

    def test_check_if_user_exists(self):
        """
        Ensure we can check if user exists.
        """
        url = reverse("account_register")
        data = {"email": "test@leadsnow.net"}
        response = self.client.get(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["detail"], "This email is already registered")

    def test_check_if_user_does_not_exist(self):
        """
        Ensure we can check if user exists.
        """
        url = reverse("account_register")
        data = {"email": "test1@leadsnow.net"}
        response = self.client.get(url, data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["detail"], "This email is not registered")


@override_settings(
    ACCOUNT_EMAIL_REQUIRED=False,
    ACCOUNT_EMAIL_VERIFICATION="none",
)
class LoginTest(test.APITestCase):
    def setUp(self):
        url = reverse("account_register")
        self.url = reverse("account_login")
        self.username = "testuser"
        self.email = "testuser@domain.com"
        self.password = "testPassword123!"

        # Sign up user
        data = {
            "email": self.email,
            "username": self.username,
            "password1": self.password,
            "password2": self.password,
        }
        self.client.post(url, data, format="json")

    def test_login_with_email(self):
        """
        Ensure we can login using email.
        """
        data = {"email": self.email, "password": self.password}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_with_username(self):
        """
        Ensure we can login using username.
        """
        data = {"username": self.username, "password": self.password}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_without_username_or_email(self):
        """
        Ensure we cannot login without username or email.
        """
        data = {"password": self.password}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_without_invalid_creditentials(self):
        """
        Ensure we cannot login with invalid credentials.
        """
        data = {"username": self.username, "password": self.password + "invalid"}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

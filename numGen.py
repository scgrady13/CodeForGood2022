



import random

import pandas as pd


if __name__ == "__main__":
#data generation function
    heartRate = 0
    data = []
    #data generation for heartrate usage
    #simulating data for range between regular( 60 to 90 ) and range out (-10 to +20)
    for i in range(100000):
        heartRate = random.randint(50, 110)
        data.append(heartRate)
        
   
    
        
    
        
    
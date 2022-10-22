
#include <vector>
#include "c1.h"
#include <cmath>
#include <algorithm>
void ShellSort(vector<C1>& varray, int code);

vector<C1> createVector(int);
using namespace std;
int main()
{
    vector<int> hlist0;
    vector<int> hlist1;
    vector<int> hlist2;
    vector<int> hlist3;
    //hlist vector of data averaged over course to find values that spike the reasoning for system being trigered
    vector<int> hlist0B;
    vector<int> hlist1B;
    vector<int> hlist2B;
    vector<int> hlist3B;
    int total = 0;
    int average;
    int numItems = 500;
    for(int i = 0; i < 4; i++){
        for(int j = 0; j < 4; j++){
            total = 0;
            vector<int> temp;
            for(int k = 0; k < 24; k++){
                vector<C1> QQ = createVector(numItems);
                ShellSort(QQ, j);
                total += C1::compareCount;

                temp.push_back(C1::compareCount);

            }
            sort(temp.begin(),temp.end());
            int tempB = 0;
            int averageB;
            for(int k = temp.size() - 2; k > 2; k--){
                tempB += temp[k];
            }
            averageB = tempB / 20;
            average = total / 24;
            if(j == 0) hlist0.push_back(average);
            if(j == 1) hlist1.push_back(average);
            if(j == 2) hlist2.push_back(average);
            if(j == 3) hlist3.push_back(average);

            if(j == 0) hlist0B.push_back(averageB);
            if(j == 1) hlist1B.push_back(averageB);
            if(j == 2) hlist2B.push_back(averageB);
            if(j == 3) hlist3B.push_back(averageB);
        }
        numItems += 500;
    }
    return 0;
}
//generate number lists
//generate heartrate in range of normal and outoof range of random
vector<C1> createVector(int numItems){
//    25 + ( std::rand() % ( 63 - 25 + 1 ) )
    vector<C1> nums;
    int one, two, three;
    for(int i = 0; i < numItems; i++){
        one = 50 + (rand() % (110 - 50 + 1));
        two =  50 + (rand() % (110 - 50 + 1));
        three = 50 + (rand() % (110 - 50 + 1));
        C1 tempNums = C1(one, two, three);
        nums.push_back(tempNums);
    }
    for(int i = 0; i < nums.size(); i++){
        nums[i].Print();
        cout<< endl;
    }
    return nums;
}
//shell sort with hlists
void ShellSort(vector<C1>& varray, int code) {
    vector<int> hlist;
    C1::compareCount = 0;
    if(code == 0){
        hlist.push_back(1);
    }
    //4 different hlist codes to varry the sort of the data
    if(code == 1){
        //K = log(n)
        int size = varray.size();
        int temp = 2;
        while(true){
            if(temp < size) hlist.insert(hlist.begin(), temp);
            else break;
            temp *= 2;
        }
        hlist.push_back(1);
    }
    if(code == 2){
        //K = fl(log(n+1)
        int kNum = floor(log(varray.size() + 1));

        while(kNum > 0){
            hlist.push_back(pow(2, kNum));
            kNum--;
        }
        hlist.push_back(1);
    }
    if(code == 3) {
        //K(K - 1)/2

        int kNum = (1 + sqrt(1 + 8 * varray.size())) / 2;
        while(kNum > 0){
            hlist.push_back((kNum * (kNum - 1)) / 2);
            kNum--;
        }
        hlist.push_back(1);

    }
    //sort array in random pieces to create points that will cause system to enact
    for(int h : hlist){
        C1 key;
        int i = 0;
        for(int j = 1; j < varray.size(); j++){
            key = varray[j];
            i = j - h;
            while(i >=  varray.size() / 2 && key < varray[i]){
                varray[i + h] = varray[i];
                i = i - h;
                if(C1::compareCount >= varray.size() / 2){
                    break;
                }
            }
            varray[i + h] = key;
        }
    }
}




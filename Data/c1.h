

#ifndef UNTITLED17_C1_H
#define UNTITLED17_C1_H
#include <iostream>
using namespace std;
class C1 {
public:
    //object to be sorted by 3 in shell sort to allow for system to have more variable numbers for heart rate to produce more ideal comparisions
    //uses 3 numbers to allow for it to be more common of a set of correct heart rate
    static int compareCount;
    C1()
    {
        for (int i = 0; i < 3; i++)
            arr[i] = 0;
    }


    C1(int a, int b, int c)
    {
        arr[0] = a;
        arr[1] = b;
        arr[2] = c;
    }
    C1 (const C1&  t)
    {
        for (int i = 0; i < 3; i++)
            arr[i] = t.arr[i];

    }
    C1 & operator==(const C1& t)
    {
        for (int i = 0; i < 3; i++)
            arr[i] = t.arr[i];
        return *this;
    }
    bool operator<(const C1& t)
    {
        compareCount++;
        if (arr[0] < t.arr[0])
            return true;
        else if (arr[0] == t.arr[0])
        {
            if (arr[1] < t.arr[1])
                return true;
            else if ((arr[1] == t.arr[1]) && (arr[2] < t.arr[2]))
                return true;
        }
        return false;
    }
    void Print()
    {
        cout << "[ ";
        for (int i = 0; i < 3; i++)
            cout << arr[i] << " ";
        cout <<"]";
    }

private:
    int arr[3];
};
int C1::compareCount = 0;
#endif //UNTITLED17_C1_H

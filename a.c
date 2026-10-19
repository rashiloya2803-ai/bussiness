#include <stdio.h>

int main(){
    int i,n,j;
    printf("size of array");
    scanf("%d",&n);
    int arr[n];

    for(i=0;i<n;i++){
        scanf("%d",&arr[i]);
    }
    int target;
    scanf("%d",&target);

    int a[2];
    int k=0;
    for(i=0;i<n;i++){
        for(j=1;j<n;j++){
            if(arr[i]+arr[j]==target){
                a[k]=i;
                a[k+1]=j;
                break;
            }
        }
    
    }
    for(i=0;i<2;i++){
        printf("%d",a[i]);
    }
}
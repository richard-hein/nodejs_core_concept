#include <stdio.h>
#include <stdlib.h>


int main() {

  // int is 4 bytes (32 bits) - singed
  int a = 3500;

  /**
  a:
  00000000000000000000110110101100
  */

  /**
  &a:
  0x154723f4
  */

  int * myPointer = &a;

  // type casting
  char *myPointer2 = (char *)myPointer;

  printf("string is %s\n", myPointer2);

  // stack (8 MB), heap

  int * allocatedMemory = malloc(12); // 12 bytes

  for (int i = 0; i < 3; i++) {
    allocatedMemory[i] = 1937208183;
  }

  for (int i = 0; i < 3; i++) {
    printf("Number is: %d\n", allocatedMemory[i]);
  }

  char * charAllocatedMemory = (char *)allocatedMemory;
  for (int i = 0; i < 12; i++) {
    printf("Character is: %c\n", charAllocatedMemory[i]);
  }


  return 0;
}
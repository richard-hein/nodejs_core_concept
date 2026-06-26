#include <stdio.h>

// Returns the length of a string pointer
int length(char s[]) {
  char c = s[0];
  int length = 0;

  while (c != '\0') {
    length++;
    c = s[length];
  }

  return length;
}

int main() {

  // int, size_t, char, float

  // int a = 20;
  // int b = 30;
  // int c = add(a, b);

  // size_t t = 0 18.....

  // char my_character = 'g';

  // float foo = 234234.23423;

  // size_t t = 15934;

  // // fprintf(stdout, "Size of a long int value is: %zu bytes.\n", sizeof(long int));
  // printf("address is %p.\n", &t);

  // for (int i = 0; i < sizeof(size_t); ++i) {
  //   printf("Byte %d address: %p. Value is %c \n", i, (void *)((char *)&t + i), *(((char *)&t + i)));
  // }


  // Defining a new variable 'a', and a new pointer 'my_pointer'.
  // 'my_pointer' saves the address of a.
  int a = 20;
  int * my_pointer = &a;

  char myStr[6];

  myStr[0] = 'T';
  myStr[1] = 'e';
  myStr[2] = 's';
  myStr[3] = 't';
  myStr[4] = '\0';

  char *myOtherStr = "This is my string";

  printf("The length of my string is: %d\n", length(myStr));
  printf("My string address is: %p\n", myStr);
  printf("My string address is: %p\n", &myStr[0]);

  return 0;
}


#include <stdio.h>

struct Object {
    const char *name;
};

void modify(struct Object * o, int n) {
    (*o).name = "Dylan";
    n = 1000;
}

int main() {
    struct Object obj;
    obj.name = "Joe";

    int num = 700;

    printf("Before modification:\n");
    printf("obj.name: %s\n", obj.name);
    printf("num: %d\n", num);

    modify(&obj, num);

    printf("\nAfter modification:\n");
    printf("obj.name: %s\n", obj.name);
    printf("num: %d\n", num);

    return 0;
}
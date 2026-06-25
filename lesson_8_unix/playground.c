#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>

int main(int argc, char *argv[]){
    fprintf(stdout, "Some text for stdout. (coming from C)");
    fprintf(stderr, "Some text for stderr. (coming from C)");
    
    int c = fgetc(stdin);
    while(c != EOF) {
        fprintf(stdout, "%c", c);
        fflush(stdout);

        c = fgetc(stdin);
    }



    return 0;
}
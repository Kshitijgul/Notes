import java.util.*;

// public class Main{
//     public static void main(String[] args){
//         Scanner sc = new Scanner(System.in);
//         int n = sc.nextInt();
//         int product = 1;
//         while( n != 0){
//             int digit = n%10;
//             product = product * digit;
//             System.out.println(n);
//             n = n/10;
            

//         }
//         System.out.println(product);

//     }
// }


public class Main{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int count = 0;
        int product = 1;
        while( n != 0){
            count++;
            int digit = n%10;
            product = product * digit;
            System.out.println(n);
            n = n/10;
            

        }
        System.out.println(product);
        System.out.println(count);

    }
}
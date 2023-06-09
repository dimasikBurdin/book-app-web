import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { BookModule } from "./book/book.module";
import { MyBooksModule } from "./my-books/my-books.module";
import { MyBookModule } from "./my-book/my-book.module";
import { AllBooksModule } from "./all-books/all-books.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    UserModule,
    BookModule,
    MyBooksModule,
    MyBookModule,
    AllBooksModule,
    AuthModule,
  ],
})
export class ApiModule {}

import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { BookModule } from "./book/book.module";
import { MyBooksModule } from "./my-books/my-books.module";
import { MyBookModule } from "./my-book/my-book.module";

@Module({
  imports: [UserModule, BookModule, MyBooksModule, MyBookModule],
})
export class ApiModule {}

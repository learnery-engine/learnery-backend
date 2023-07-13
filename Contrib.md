# Contributing to this project



### How to cache?

[Cache Doc](https://docs.nestjs.com/techniques/caching)


### How to access db?

This project utilizes ["Prisma"](https://www.prisma.io), an ORM (Object Relation Mapper) which facilitates db migrations, 
Typescript model generation out of the box.

### How to create tables/models?

1. Make the necessary changes in prisma/schema.prisma
2. ```prisma generate ```
3. To deploy:  
```pnpm prisma:local:deploy```

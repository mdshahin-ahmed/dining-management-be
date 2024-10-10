### Assignment 2

Api end point: (https://level2-assignment4-three.vercel.app/)

Model Diagram Link: (https://lucid.app/lucidchart/c83bfefb-90a7-47f8-aa20-092e75a83564/edit?beaconFlowId=CDD1F0F4CE50E36B&invitationId=inv_494d1ed3-41ee-4f17-9e2d-38bc587914f3&page=0_0#)

#### First you need to clone this repository

```bash
git clone https://github.com/Porgramming-Hero-web-course/l2b2a4-course-review-with-auth-mdshahin-ahmed.git
```

#### You need to install all packages

```bash
npm install
```

#### You need to build locally

```bash
npm run build
```

#### After build this project locally. You can run this project locally with this command

```bash
npm start
```

#### After that you can see `My app listening on port 5000`

#### If you want to run it for development you can use this command

```bash
npm run start:dev
```

#### Api For Auth

1. Register user
   method: **POST**
   end points: **/api/auth/register**
2. Login user/admin
   method: **POST**
   end points: **/api/auth/login**
3. Change password
   method: **POST**
   end points: **/api/auth/change-password**

#### Api For Category

3. Create Category
   method: **POST**
   end points: **/api/categories**
4. Get all categories
   method: **GET**
   end points: **/api/categories**

#### Api For Course

1. Create a Course
   method: **POST**
   end points: **/api/course**
2. get Paginated and filtered Course
   method: **GET**
   end points: **/api/courses**

`pagination`

- page => page
- limit => limit

`sorting`

- sortBy => sort
  => title,price,startDate,endDate,language,duration
  => Ex: ?sort=startDate
- sortOrder => sort
  => asc, desc

`filtering`

- minPrice , maxPrice => filter
- tags => filter
- startDate, endDate => filter
- language => filter
- provider => filter
- durationWeeks => filter
- level => filter

6. Update a course
   method: **PUT**
   end points: **/api/courses/:courseId**
7. Get course by id with reviews
   method: **GET**
   end points: **/api/courses/:courseId/reviews**
8. Get the Best Course Based on Average Review (Rating)
   method: **GET**
   end points: **/api/course/best**

#### Api For Review

5. Create a review
   method: **POST**
   end points: **/api/reviews**

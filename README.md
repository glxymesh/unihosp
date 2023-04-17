# UniHosp - United Hospital

UniHosp stands for United Hospitals acronym we made for our website name. We built this project with the thinking to convert entire health sector digital by recording all the medical history of the citizen of India into database and which they can by a given Uni ID which a user can create during the registration. We are trying built a prototype to connect  all the hospital like UPI connected all the banks for online revolution of Indian Financial Sector.

## Problem Being Addressed
Suppose a person had a medical surgery in one state and changed city after few years. If he needed a new surgery the doctor might need past medical records and checkup reports. 
Now If that is the case it can be possible that those documents got lost or damaged or not in very good condition to be read or understand. And if that's the case, that person might to go through another body check up which is cost him a lot money. As India's health sector is not cheap, If you are in India there is great chance you know that.

## Solution 
There is very simple solution to convert entire health sector of India digital and save all  the data related to citizens health in clouds and give access to user of these services to monitor there health profile and control the access who see and who can't so that can be accessed as they need the profile can be shared.

This service will work like UPI, Every Person will be given a Uni ID as we named it for a while. With the Help Of Uni ID hospitals will be able update citizen health report on cloud which is going to be managed centrally like any other servers. User is can access these reports in there Health Profile.

## Addressed Problem and Services

1. Anytime access of past medical records using UniID
2. Helps in finding Hospital and Making appointments with doctors
3. Notifications related Profile Access, Health Issues, Doctor Appointments
4. Health Profile Access Management

### User Flow

![](https://github.com/glxymesh/unihosp/blob/main/source/userflow.png)

### Project Details

![](https://github.com/glxymesh/unihosp/blob/main/source/project_structure.png)


To view the currently deployed app [Click Here](https://unihosp.live)


There are two main folders and branches which are webfront (client) and uniserver.

#### Webfront
Webfront is an angular app
In main branch it is located at:




`client`
client consists of our app frontend design and app flow logic

It's not fully completed yet so we have deployed a development build right some features might break. 


![](https://github.com/glxymesh/unihosp/blob/main/source/registerpage.png)


##### Dashboard

![](https://github.com/glxymesh/unihosp/blob/main/source/welcome.png)


Note:
We are trying to hide as much as secret keys and token as we can so please be carefull if you are trying to exploit.



#### Uniserver
Uniserver is an nest.js server which is the main server
In main branch it is located at:
`uniserver`
In the uniserver main folder one is `prisma` and `src`
`prisma` Consits of our database schema
`src` Consists of authentication and all the logics of it's not yet completely perfect



## Technologies Used:
1. Google Cloud Instance for website building and deployment.
2. Google Cloud SQL for Database hosting.
3. Node.js, Nest.js for server design, Prisma ORM For database connection 
4. Socket IO for notification services.
5. Programming Languages - _Typescript/Javascript_
6. Angular framework for frontend.
7. Services Used - Twilio and Elastic Mail

---

## Conclusion

This project is designed for the upcoming Solving For India project

UniHosp is a revolutionary digital platform that aims to make healthcare accessible and convenient for patients and doctors. By providing patients with a centralised platform to manage their medical records, access medical services, and communicate with healthcare providers, UniHosp enables doctors to provide better care and improve patient outcomes. The use of advanced technologies such as Google Maps API, Socket.IO, and Angular framework, combined with the ease of use and convenience of the platform, makes UniHosp an ideal solution for addressing the challenges faced by the healthcare sector in India.


### By Team - Creators

#### Team Members
1. Abhishek Mourya
2. Aryan Karma

If You See any issue with deployed app please contact us at: 

##### creator6774@gmail.com
---


##### UNIHOSP - UNITED HOSPITAL
---
##### Thank you for viewing
---

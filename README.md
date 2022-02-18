# TraceTheWaste
This repo shows the mobile application created for collection of construction waste data. It is part of a larger project called <i> Trace The Waste </i>.

<i>Trace The Waste</i> was my bachelors degrees project, together with my team we built a complete system for data collection of construction waste. The system had a mobile application that each waste driver would use to document their shipment, a website for administrating the users of the application and access of the system, and a database to store the information.
The full project report can be found here: http://liu.diva-portal.org/smash/record.jsf?pid=diva2:1569418

The mobile app is written in React Native and uses an API to communicate with the database. Within the aplication various checks of the entered data are performed to verify completeness and correctness. 

A construction waste driver needs to provide the following information in each report:
  - An image of the delivery reciept.
  - An image of the waste.
  - Load information: Date, Site, Bin, Docket No. and weight.
  - Percentages of the material distribution.

Below is the applications basic flow of a report demonstrated:
Login -> Home -> Load -> Material -> Uploaded
![Mobilap_flow_send](https://user-images.githubusercontent.com/75698736/154735143-b4918b21-349d-4bba-b00a-18b61652d104.jpg)

<h2> Load screen </h2>
Lets take a closer look on the Load screen. The load screen lets the user select what information to upload, and each field is adapted to the content it should contain. Starting from the top, images of the recipt and waste are wanted. Upon pressing the buttons with a camera symbol the phones camera is openend and lets the user take a picture. When the user is satisfied with the picture it is saved and shown as the background of the button. 

The date can be selected by using a popup calendar. The site and bin fields have the same alternatives every time so a dropdown is used to minimize typing. The options of the dropdowns are retrived from the companys database as it varies between customers. A pop keyboard is used to input wheight and docket number as it varies every time. Please see images of each step below:
![mobileapp_load_fields_methods](https://user-images.githubusercontent.com/75698736/154740714-41879c49-7b2a-4c10-8998-bc6bee1c2039.jpg)


<h2>Material screen</h2>
The material screen has a scrollable list that contains all the materials the company transports. The user adjusts the percentages with the plus and minus buttons, and the total shows up at the bottom. When the total is 100% the button changes to submit and allowes the report to be published.

![mobilapp_procent_sum_demo](https://user-images.githubusercontent.com/75698736/154741555-dfc6fedc-b841-4131-8b01-75a47742fbaa.jpg)

<h2> Edit uploaded report </h2>
Now 

![mobilapp_flow_history](https://user-images.githubusercontent.com/75698736/154743404-516a6103-1d9a-405a-adb6-9b9878e9d5f7.jpg)


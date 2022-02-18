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

Lets take a closer look on the Load screen. The load screen lets the user select what information to upload, and each field is adapted to the content it should contain. Starting from the top, images of the recipt and waste are wanted. Upon pressing the buttons with a camera symbol the phones camera is openend and lets the user take a picture. When the user is satisfied with the picture it is saved and shown as the background of the button. 

The date can be selected by using a popup calendar. The site and bin fields have the same alternatives every time so a dropdown is used to minimize typing. The options of the dropdowns are retrived from the companys database as it varies between customers. A pop keyboard is used to input wheight and docket number as it varies every time. 
![mobileapp_load_fields_methods](https://user-images.githubusercontent.com/75698736/154740714-41879c49-7b2a-4c10-8998-bc6bee1c2039.jpg)

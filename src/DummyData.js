import user_1 from './assets/user-1.png'
import user_2 from './assets/user-2.png'
import user_3 from './assets/user-3.png'
import user_4 from './assets/user-4.png'

export const userData = [
    {
      name: "Jan",
      "Active User": 4000,
    },
    {
      name: "Feb",
      "Active User": 3000,
    },
    {
      name: "Mar",
      "Active User": 5000,
    },
    {
      name: "Apr",
      "Active User": 4000,
    },
    {
      name: "May",
      "Active User": 3000,
    },
    {
      name: "Jun",
      "Active User": 2000,
    },
    {
      name: "Jul",
      "Active User": 4000,
    },
    {
      name: "Agu",
      "Active User": 3000,
    },
    {
      name: "Sep",
      "Active User": 4000,
    },
    {
      name: "Oct",
      "Active User": 1000,
    },
    {
      name: "Nov",
      "Active User": 4000,
    },
    {
      name: "Dec",
      "Active User": 3000,
    },
  ];

  export const userRows = [
    {
      id: 1001,
      username: "Customer1",
      avatar:
        user_1,
      email: "customer1@gmail.com",
      status: "active",
      services_got: 2,
      address: "Jaffna"
    },
    {
      id: 1002,
      username: "Customer2",
      avatar:
        user_2,
      email: "customer2@gmail.com",
      status: "passive",
      services_got: 3,
      address: "Jaffna"
    },
    {
      id: 1003,
      username: "Customer3",
      avatar:
        user_3,
      email: "customer2@gmail.com",
      status: "active",
      services_got: 2,
      address: "Jaffna"
    },
    {
      id: 1004,
      username: "Customer3",
      avatar:
        user_4,
      email: "customer3@gmail.com",
      status: "active",
      services_got: 0,
      address: "Jaffna"
    },
    {
      id: 1005,
      username: "Customer5",
      avatar:
        user_1,
      email: "customer5@gmail.com",
      status: "passive",
      services_got: 1,
      address: "Jaffna"
    },
    {
      id: 1006,
      username: "Customer6",
      avatar:
        user_2,
      email: "customer6@gmail.com",
      status: "active",
      services_got: 2,
      address: "Jaffna"
    },
    {
      id: 1007,
      username: "Customer7",
      avatar:
       user_3,
      email: "customer7@gmail.com",
      status: "active",
      services_got: 3,
      address: "Jaffna"
    },
    {
      id: 1008,
      username: "Customer8",
      avatar:
        user_4,
      email: "customer8@gmail.com",
      status: "active",
      services_got: 1,
      address: "Jaffna"
    },
    {
      id: 1009,
      username: "Customer9",
      avatar:
        user_1,
      email: "customer9@gmail.com",
      status: "passive",
      services_got: 3,
      address: "Jaffna"
    },
    {
      id: 1010,
      username: "Customer10",
      avatar:
        user_2,
      email: "customer10@gmail.com",
      status: "active",
      services_got: 2,
      address: "Jaffna"
    },
    {
      id: 1011,
      username: "Customer11",
      avatar:
        user_3,
      email: "customer11@gmail.com",
      status: "active",
      services_got: 3,
      address: "Jaffna"
    },
    {
      id: 1012,
      username: "Customer12",
      avatar:
        user_4,
      email: "customer12@gmail.com",
      status: "passive",
      services_got: 4,
      address: "Jaffna"
    },
  ];

  export const bookingRow = [
    {
      id: 10001,
      service: "Electric",
      customer: "customer1",
      provider: "provider10",
      status: "Pending"
    },
    {
      id: 10002,
      service: "Electronic",
      customer: "customer4",
      provider: "provider3",
      status: "Accepted"
    },{
      id: 10003,
      service: "Construction",
      customer: "customer3",
      provider: "provider1",
      status: "Completed"
    },
    {
      id: 10004,
      service: "Event Management",
      customer: "cstomer8",
      provider: "provider6",
      status: "Declined"
    },
    {
      id: 10005,
      service: "Construction",
      customer: "customer4",
      provider: "provider2",
      status: "Pending"
    },
    {
      id: 10006,
      service: "Electric",
      customer: "customer1",
      provider: "provider5",
      status: "Declined"
    },
    {
      id: 10007,
      service: "Construction",
      customer: "customer9",
      provider: "provider2",
      status: "Accepted"
    },
    {
      id: 10008,
      service: "Event Management",
      customer: "customer9",
      provider: "provider9",
      status: "Completed"
    },
    {
      id: 10009,
      service: "Electronic",
      customer: "customer8",
      provider: "provider1",
      status: "Pending"
    },
    {
      id: 10010,
      service: "Construction",
      customer: "customer1",
      provider: "provider2",
      status: "Declined"
    },
  ]

  export const providerRows = [
    {
      id: 5001,
      username: "provider1",
      avatar: user_4,
      email: "provider1@gmail.com",
      service: "Electric",
      status: "active" ,
      address: "Jaffna",
      experience: "2 years",
    },
    {
      id: 5002,
      username: "provider2",
      avatar: user_3,
      email: "provider2@gmail.com",
      service: "Electronic",
      status: "passive" ,
      address: "Jaffna",
       experience: "2 years",
    },
    {
      id: 5003,
      username: "provider3",
      avatar: user_2,
      email: "provider3@gmail.com",
      service: "Construction",
      status: "active" ,
      address: "Jaffna",
       experience: "2 years"
    },
    {
      id: 5004,
      username: "provider4",
      avatar: user_1,
      email: "provider4@gmail.com",
      service: "Event Management",
      status: "passive" ,
      address: "Jaffna",
       experience: "2 years"
    },{
      id: 5005,
      username: "provider5",
      avatar: user_4,
      email: "provider5@gmail.com",
      service: "Event Management",
      status: "active" ,
      address: "Jaffna",
       experience: "2 years"
    },
    {
      id: 5006,
      username: "provider6",
      avatar: user_3,
      email: "provider6@gmail.com",
      service: "Electric",
      status: "active" ,
      address: "Jaffna",
       experience: "2 years"
    },
    {
      id: 5007,
      username: "provider7",
      avatar: user_2,
      email: "provider7@gmail.com",
      service: "Construction",
      status: "active" ,
      address: "Jaffna",
       experience: "2 years"
    },
    {
      id: 5008,
      username: "provider8",
      avatar: user_1,
      email: "provider8@gmail.com",
      service: "Electronic",
      status: "active" ,
      address: "Jaffna",
       experience: "2 years"
    },
    {
      id: 5009,
      username: "provider9",
      avatar: user_3,
      email: "provider9@gmail.com",
      service: "Construction",
      status: "passive" ,
      address: "Jaffna",
       experience: "2 years"
    },
    {
      
        id: 5010,
        username: "provider10",
        avatar: user_1,
        email: "provider10@gmail.com",
        service: "Electric",
        status: "active" ,
        address: "Jaffna" ,
         experience: "2 years"
      
    }
  ]

  export const dataVerify = [
    {
      id:15001,
      provider: "Provider11",
      email: "provider11@gmail.com",
      service: "Electric",
      date: "28/06/2024"
    },
    {
      id:15002,
      provider: "Provider12",
      email: "provider12@gmail.com",
      service: "Electronic",
      date: "27/06/2024"
    },
    {
      id:15003,
      provider: "Provider13",
      email: "provider13@gmail.com",
      service: "Construction",
      date: "26/06/2024"
    },
    {
      id:15004,
      provider: "Provider14",
      email: "provider14@gmail.com",
      service: "Event Management",
      date: "25/06/2024"
    }
  ]

  export const dataFeedback = [
    {
      id: 20001,
      user: "Customer",
      username: "customer2",
      email: "customer2@gmail.com",
      date: "27/06/2024"
    },
    {
      id: 20002,
      user: "Provider",
      username: "provider1",
      email: "provider1@gmail.com",
      date: "26/06/2024"
    },
    {
      id: 20003,
      user: "Customer",
      username: "customer10",
      email: "customer10@gmail.com",
      date: "25/06/2024"
    },
    {
      id: 20004,
      user: "Provider",
      username: "provider4",
      email: "provider4@gmail.com",
      date: "21/06/2024"
    }
  ]

  export const dataMessage = [
    {
      id: 25001,
      username: "provider4",
      email: "provider4@gmail.com",
      date: "21/06/2024"
    },
    {
      id: 25002,
      username: "customer1",
      email: "customer1@gmail.com",
      date: "20/06/2024"
    },
    {
      id: 25003,
      username: "customer5",
      email: "customer5@gmail.com",
      date: "18/06/2024"
    },
    {
      id: 25004,
      username: "customer2",
      email: "customer2@gmail.com",
      date: "26/06/2024"
    },
    {
      id: 25005,
      username: "provider3",
      email: "provider3@gmail.com",
      date: "25/06/2024"
    },
    {
      id: 25006,
      username: "customer9",
      email: "customer9@gmail.com",
      date: "24/06/2024"
    }
  ]

  
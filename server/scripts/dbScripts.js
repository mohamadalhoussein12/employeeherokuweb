// libraries
const request = require('request');
const mongoose = require('mongoose');

// constants
const { DB_MODELS, DATABASE } = require('../constants');

// functions
const mongo = require('../database/mongo');
const { getDepartments } = require('../database/helpers/department');
const { getLocations } = require('../database/helpers/location');

// insert array of title and description departments into mongo db
const createDepartments = async () => {
  const departments = [
    {
      title: 'IT',
      description: 'IT Department',
    },
    {
      title: 'HR',
      description: 'HR Department',
    },
    {
      title: 'Marketing',
      description: 'Marketing Department',
    }
  ]
  await mongo.insertMany({
    model: DB_MODELS.DEPARTMENT,
    data: departments
  })
  console.log('Done Creating Employees');
}

// insert array of names locations into mongo db
const createLocations = async () => {
  const locations = [
    {
      name: 'Beirut',
    },
    {
      name: 'London',
    },
    {
      name: 'Berlin',
    }
  ]
  await mongo.insertMany({
    model: DB_MODELS.LOCATION,
    data: locations
  })
  console.log('Done Creating Locations');
}

/**
 * get departments and locations from our mongo db
 * gets ramdom users data using randomuser.me api
 * loops over data, gets name, image and email for each user
 * adds departmentId and locationId randomly to each user
 * inserts data to Employee collection in mongo
 * @return {Promise} inserted employees records
 *
 */
const createEmployees = async () => {
  try {
    const departments = await getDepartments();
    const locations = await getLocations();
    request('https://randomuser.me/api/?results=100&inc=name,picture,email&nat=us', async function (error, response, body) {
      const data = []
      JSON.parse(body).results.forEach((item, i) => {
        data.push({
          name: `${item.name.first} ${item.name.last}`,
          imageUrl: item.picture.large,
          email: item.email,
          departmentId: departments[Math.floor(Math.random()*departments.length)]._id,
          locationId: locations[Math.floor(Math.random()*locations.length)]._id
        })
      });
      await mongo.insertMany({
        model: DB_MODELS.EMPLOYEE,
        data: data
      })
      console.log('Done Creating Employees');
    })
  }
  catch (err) {
    console.log('error while creating employees', err);
  }
}

//connect to our mongo db
mongoose.connect(`${DATABASE.URL}?retryWrites=true`, {
  useNewUrlParser: true
}).then(async (res) => {
  console.log('Dropping Database...');
  //drop database if exists
  await mongo.deleteMany({ model: DB_MODELS.DEPARTMENT, condition: {} });
  await mongo.deleteMany({ model: DB_MODELS.LOCATION, condition: {} });
  await mongo.deleteMany({ model: DB_MODELS.EMPLOYEE, condition: {} });

  console.log('Creating Collections');
  // create locations
  await createLocations();
  //create departments
  await createDepartments();
  //create employees
  await createEmployees();
  //set timeout 3 secs then close connection
  setTimeout(() => {
    mongoose.connection.close();
  }, 3000);
})

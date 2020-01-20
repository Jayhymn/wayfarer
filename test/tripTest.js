/* eslint-disable arrow-parens */
/* eslint-disable no-undef */
import http from 'chai-http'
import chai from 'chai'

chai.use(http)

const { expect } = chai
const { protocol = 'http://', ip = '127.0.0.1', port = ':3000' } = process.env
const url = protocol + ip + port

// an admin
const admin = {
  bus_id: '005',
  origin: 'Lokoja',
  destination: 'Ilorin',
  trip_date: '01/24/2020',
  fare: '#500',
  is_admin: true,
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJpc19hZG1pbiI6dHJ1ZSwiaWF0IjoxNTc5NDY1NDY2fQ.iYUnp4c_3zCKu_Ai85y0zyHN3Exkkq80guOtO7Yu-m0',
}

// a registered user
const user = {
  bus_id: '005 BY',
  origin: 'Lokoja',
  destination: 'Ilorin',
  trip_date: '01/24/2020',
  fare: '#500',
  is_admin: false,
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTU3OTUyODQ2M30.Z5JVmjPYhxK20ef48HDno7a6FsscmEwycMGISUTpkfM',
}

// a visitor
const visitor = {
  bus_id: '005 by',
  origin: 'Lokoja',
  destination: 'Ilorin',
  trip_date: '2020-24-01',
  fare: '#500',
  is_admin: true,
  token: '',
}
const trip_id = 1

describe('view trips', () => {
  it('admin / should view all trips', (done) => {
    // send request to the app
    chai.request(url)
      .get('/api/v1/trip').send(admin)
      .then((res) => {
        expect(res).to.have.status(200)
        expect(res.body).has.keys(['status', 'data'])
        done()
      })
      .catch(err => console.log(err))
  })

  it('user / should view all trips', (done) => {
    chai.request(url)
      .get('/api/v1/trip').send(user)
      .then((res) => {
        expect(res).to.have.status(200)
        expect(res.body).has.keys(['status', 'data'])
        done()
      })
      .catch(err => console.log(err))
  })

  it('non users / should be denied access', (done) => {
    // send request to the app
    chai.request(url)
      .get('/api/v1/trip').send(visitor)
      .then((res) => {
        expect(res).to.have.status(400)
        expect(res.body).has.keys(['status', 'error'])
        done()
      })
      .catch(err => console.log(err))
  })
})

describe('create trips', () => {
  // create trip as admin
  it('admin/ should create new trips', (done) => {
    // send request to the app
    chai.request(url)
      .post('/api/v1/trip').send(admin)
      .then((res) => {
        expect(res).to.have.status(200)
        expect(res.body).has.keys(['status', 'data'])
        expect(res.body.data).has.keys(['trip_id', 'bus_id', 'origin', 'destination', 'trip_date', 'fare', 'status'])
        done()
      })
      .catch(err => console.log(err))
  })

  // create trip as user
  it('user/should show unauthorized acceess', (done) => {
    chai.request(url)
      .post('/api/v1/trip').send(user)
      .then((res) => {
        expect(res).to.have.status(400)
        expect(res.body).has.key(['status', 'error'])
        done()
      })
      .catch(err => console.log(err))
  })
})

describe('delete trip', () => {
  // as admin
  it('admin/ should cancel trip', (done) => {
    chai.request(url)
      .patch(`/api/v1/trip/${trip_id}`).send(admin)
      .then((res) => {
        expect(res).to.have.status(200)
        expect(res.body).has.keys(['status', 'data'])
        done()
      })
      .catch(err => console.log(err))
  })

  // as user
  it('user/ should return denied access', (done) => {
    chai.request(url)
      .patch(`/api/v1/trip/${trip_id}`).send(user)
      .then((res) => {
        expect(res).to.have.status(400)
        expect(res.body).has.keys(['status', 'error'])
        done()
      })
      .catch(err => console.log(err))
  })
})

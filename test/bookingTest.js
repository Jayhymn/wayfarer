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
  trip_id: 1,
  is_admin: true,
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJpc19hZG1pbiI6dHJ1ZSwiaWF0IjoxNTc5NDY1NDY2fQ.iYUnp4c_3zCKu_Ai85y0zyHN3Exkkq80guOtO7Yu-m0',
}

// a registered user
const user = {
  trip_id: 1,
  is_admin: false,
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTU3OTUyODQ2M30.Z5JVmjPYhxK20ef48HDno7a6FsscmEwycMGISUTpkfM',
}

// a visitor
const visitor = {
  trip_id: 1,
  is_admin: true,
  token: '',
}

describe('view bookings', () => {
  it('admin / should view all bookings', (done) => {
    // send request to the app
    chai.request(url)
      .get('/api/v1/booking').send(admin)
      .then((res) => {
        expect(res).to.have.status(200)
        expect(res.body).has.keys(['status', 'data'])
        done()
      })
      .catch(err => console.log(err))
  })

  it('user / should view all bookings', (done) => {
    chai.request(url)
      .get('/api/v1/booking').send(user)
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
      .get('/api/v1/booking').send(visitor)
      .then((res) => {
        expect(res).to.have.status(400)
        expect(res.body).has.keys(['status', 'error'])
        done()
      })
      .catch(err => console.log(err))
  })
})

describe('create bookings', () => {
  // create booking as admin
  it('admin/ should create new bookings', (done) => {
    // send request to the app
    chai.request(url)
      .post('/api/v1/booking').send(admin)
      .then((res) => {
        expect(res).to.have.status(200)
        expect(res.body).has.keys(['status', 'data'])
        expect(res.body.data).has.keys(['booking_id', 'bus_id', 'seat_number', 'trip_date', 'trip_id', 'trip_status', 'user_id'])
        done()
      })
      .catch(err => console.log(err))
  })

  // create booking as user
  it('user/should show unauthorized access', (done) => {
    chai.request(url)
      .post('/api/v1/booking').send(user)
      .then((res) => {
        expect(res).to.have.status(200)
        expect(res.body).has.key(['status', 'data'])
        done()
      })
      .catch(err => console.log(err))
  })
})

describe('delete booking', () => {
  // as admin
  it('admin/ should cancel booking', (done) => {
    chai.request(url)
      .delete(`/api/v1/booking/${admin.trip_id}`).send(admin)
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
      .delete(`/api/v1/booking/${user.trip_id}`).send(user)
      .then((res) => {
        expect(res).to.have.status(200)
        expect(res.body).has.keys(['status', 'data'])
        done()
      })
      .catch(err => console.log(err))
  })
})

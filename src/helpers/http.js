/**
 * Module to handle AXIOS Requests
 */
import axios from 'axios'
export default () => {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    // timeout: 50000,
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      // Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDBhODk5NjdhNzU1N2I5OTFmZjE0NmQ2MWFhNWI3ZWI3ODdlMzVjNDY2ZWRhOGQ0NWM4OWYyNzQ5YjdkYmJkYTA4ZWQ1ZThkZGJkNWFhYWUiLCJpYXQiOjE2OTA4OTE1MjIuMTU3ODM5LCJuYmYiOjE2OTA4OTE1MjIuMTU3ODQzLCJleHAiOjE3MjI1MTM5MjIuMDg5MDAxLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.kReHUBABEwZJYz4u9U5KUiZVPs3qxFAPYOI56Mq5A8bsibod90V9cj3vX7RUQ0AfNLSUbTHhWIvOF2pLXlk29WFV_sbrH_no5rvaKk4rjQBma7L9SlyU-ZwLy5Ck6_3hVc4-Pe8Lv-H18eoix0wsDx83u8d2GoBAYEKwbNRynjhGsUVdDbTNaHpdFT7sarEPamGN-eOddVygUAHthvEyKuJa-2opOEbZiLchkFEXa_gcEOvcAlW7_ZOhRDgu0Dpk1cC9twnOWo4kvKtAKmgrYTINmwa1YWu6Rtb13gMc8ZrB_wjSB5QWIUztXZcryD86Gx69c-15Bq4lPUgEKmiMGTftCPZ-OVhBi0ukxZrDedrxzUF00SO2t6cEYEOt5HatdS79Gn67-ydZtLKeS-DiArHTPUiqYsULNzpsddNvFgr5A6NZEC3sbD8Wfyx0veLIZW0ubVPNYI-HFAyXvbRp60oTXBIsVWGgbwKt5t9v19K8lINHHMNznERDlao4ZL0XXEAfsxhB97C-phsdmyc_hRngJRhZ-BtFke5dkO9_MgJkpMQOUTvLBtk3NowE9nbXwD521xiC8WRV_23-6MXIAA6MTjdp1z7RQjQvANlULFbcG6bcJdKekYERYcFhqFYCtztCkwqyzchBq-qU2FLBEwLkqTP8ZxjQIMi6RtPfWPY`,
      locale: 'en'
    }
  })
  
  return instance
}

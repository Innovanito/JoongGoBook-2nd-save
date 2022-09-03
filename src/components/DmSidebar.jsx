import React, {useState, useEffect} from 'react'
import { client, urlFor } from '../client'
import { sidebarComponents } from '../utils/data'
import { pinDetailQuery } from '../utils/data'
import DmSidebarComponents from './DmSidebarComponents'

const DmSidebar = ({user_id}) => {
  const [dm_ids, setDm_ids] = useState([])
  const [pin_ids, setPin_ids] = useState([])
  const [pinDetails, setPinDetails] = useState([])

  const fetchSidebar_ids = (user_id) => {
    const query = sidebarComponents(user_id)

    if (query) {
      client
        .fetch(query)
        .then((data) => {
          setDm_ids(data)
        })
        .catch((err) => console.log(err.message))
    }
  }

  const fetchPin_ids = (dm_ids) => {
    const idData = dm_ids?.map((element) => {
      const id = element._id.match(/[A-Za-z0-9]+._/g)
      const idForm = id[0].replace('_', '')
      return idForm
    })
    setPin_ids([...idData])
    console.log('id data', idData);
  }

  
  const fetchPinDetails = (pin_ids) => {
    let pinArray = []
    console.log('pin ids data', pin_ids);

    for (let i = 0; i < pin_ids.length; i++) {
      const query = pinDetailQuery(pin_ids[i])

      if (query) {
        client
        .fetch(query)
        .then((data) => {
          pinArray[i] = data[0]
        })
        .catch((error) => {
            console.error('Upload failed:', error.message)
        })
      }
    }
    setPinDetails(pinArray)
  }

  useEffect(() => {
    fetchSidebar_ids(user_id)
  }, [user_id])

  useEffect(() => {
    fetchPin_ids(dm_ids)
    console.log('pin_ids data', pin_ids);
  }, [dm_ids.length])

  useEffect(() => {
      fetchPinDetails(pin_ids)
      console.log( 'pinDetails data after useEffect', pinDetails);
  }, [pin_ids.length])
  
  return (
    <>
      <div className=" flex flex-col overflow-y-auto">
        {
          pinDetails ?
          <DmSidebarComponents pinDetails={pinDetails} /> :
          <h1>Didn't get the infos about DM Sidebar Components</h1>
        }
      </div>
    </>
  )
}

export default DmSidebar
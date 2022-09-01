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
          console.log('data in fetch function', i, data[0]);
          pinArray[i] = data[0]
        })
        .catch((error) => {
            console.error('Upload failed:', error.message)
        })
      }
    }
    console.log('pinArray data before function ends', pinArray);
    setPinDetails(pinArray)
    console.log('pinDetails info after client fetch', pinDetails );
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
  }, [pin_ids.length])
  console.log( 'pinDetails data after useEffect', pinDetails);
  

  return (
    <>
      <div className=" flex flex-col overflow-y-auto">
        <DmSidebarComponents pinDetails={pinDetails} />
      </div>
    </>
  )
}

export default DmSidebar
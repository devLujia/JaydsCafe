import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Map({closeModal}) {

  const [cmsLocation,setLocation] = useState('');

  useEffect(()=>{

    const fetchLocation = async () => {

      try{
        const response = await axios.post ('https://jaydscafe.com/api/cms', {title: 'Location'});
        setLocation(response.data.content || '')
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }

    }

    fetchLocation();

  },[])

    // const location = (
    //   `https://www.google.com/maps/dir//Jayd's+Cafe+BLK+4,+Lot+1+Diamond+Ave+Dasmariñas,+4114+Cavite/@14.3466386,120.9810339,20z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3397d51753ff9d15:0x1b2216c1440e07a9!2m2!1d120.9810339!2d14.3466386?entry=ttu&g_ep=EgoyMDI0MDkxMS4wIKXMDSoASAFQAw%3D%3D`)

  return (

    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg max-w-3xl w-full">
        <button 
          className="top-3 right-3 bg-red-500 text-white px-3 py-1 rounded" 
          onClick={() => closeModal(false)}
        >
          Close
        </button>
        
        <iframe 
          className="w-full h-96 rounded-lg my-7"  
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241.58707620502523!2d120.9809692939208!3d14.346640858281301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d51753ff9d15%3A0x1b2216c1440e07a9!2sJayd&#39;s%20Cafe!5e0!3m2!1sfil!2sph!4v1726370140007!5m2!1sfil!2sph" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        />
        
        <div className="flex justify-center">
          <a 
            href={cmsLocation} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="rounded-full text-white w-fit px-6 py-2 mt-7"
            id='viewloc'
          >
            Get the location
          </a>
        </div>
      </div>
    </div>
  )
}

export default Map

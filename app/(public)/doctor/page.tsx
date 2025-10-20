"use client"

import React, { useEffect, useState } from "react"
import DoctorHero from "@/components/ui/doctorHero"
import { useSearchParams } from "next/navigation"
import { SearchFunction } from "@/lib/Api/Public/api"


export default function Page() {
  const searchParams = useSearchParams()
  const query = searchParams.get("query") || ""
  const city = searchParams.get("city") || ""

  const [doctors, setDoctors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true)
        const response = await SearchFunction(query, city)
        console.log("Doctors: ", response)
        setDoctors(response)
      } catch (error) {
        console.error("Error fetching doctors:", error)
        setDoctors([])
      } finally {
        setLoading(false)
      }
    }

    if (query || city) {
      fetchDoctors()
    } else {
      setLoading(false)
    }
  }, [query, city])

  return (
   <div className='mx-25 my-18'>
    <DoctorHero 
      doctors={doctors} 
      loading={loading}
      specialization={query}
      city={city}
    />
   </div>
  )
}

 

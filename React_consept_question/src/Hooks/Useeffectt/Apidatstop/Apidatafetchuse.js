//////// ////slow net require
//// post page par clcik kari tat bak btn bacavavu jetho api data load nahi thay
///pela back btn bavaya sivay try karcy pa6i bak btn bavavavu
//////beloww 2nd mehod

// import React, { useEffect } from 'react'
// import { useState } from 'react'

// export default function Apidatafetchuse() {
//     const [data, setdata] = useState()
//     useEffect(() => {
//         let iscancelled = false
//         fetch("https://dummyjson.com/users")
//             .then(res => res.json())
//             .then(ddd => {
//                 if (!iscancelled) {

//                     alert("Still datai fetching")

//                     setdata(ddd)
//                     console.log(ddd.users)
//                 }
//             }
//             )

//         return () => {
//             iscancelled = true
//         }
//     }, [])
//     return (
//         <>
//             {/* ///// aa api n0o data ave tema user no array 6 tem amap mari ne te object form ma 6 te .id,.fiestName ...e karu */}
//             {data && data.users.map((item) => {
//                 return <p key={item.id}>{item.firstName}</p>
//             })
//             }

//         </>
//     )
// }


////-------===========///2nd method Productionlevel
import React, { useEffect } from 'react'
import { useState } from 'react'

export default function Apidatafetchuse() {
    const [data, setdata] = useState()
    useEffect(() => {
        const controlled = new AbortController()
        const signal=controlled.signal
        fetch("https://dummyjson.com/users",{signal})
            .then(res => res.json())
            .then(ddd => {
                    alert("Still datai fetching")
                    setdata(ddd)
                    console.log(ddd.users)
            }
            )

        return () => {
            console.log('aborting ...data');
           controlled.abort()
        }
    }, [])
    return (
        <>
            {/* ///// aa api n0o data ave tema user no array 6 tem amap mari ne te object form ma 6 te .id,.fiestName ...e karu */}
            {data && data.users.map((item) => {
                return <p key={item.id}>{item.firstName}</p>
            })
            }

        </>
    )
}

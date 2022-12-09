import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Table } from 'react-bootstrap'

export default function Apidata() {
  const [tdata, setTdata] = useState([])

  useEffect(() => {
    fetch("http://www.geoplugin.net/json.gp")
      .then(result => result.json())
      .then(res => {
        const myArr = [];
        myArr.push(res)
        setTdata(myArr)
      })
  },[])
  return (
    <>
      <Table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          { tdata.map((item) =>
            <tr>
              <th scope="row">1</th>
              <td>{item.geoplugin_currencyConverter}</td>
              <td>{item.geoplugin_regionName}</td>
              <td>{item.geoplugin_countryName}</td>
            </tr>
          )}
        </tbody>
      </Table>

    </>
  )
}

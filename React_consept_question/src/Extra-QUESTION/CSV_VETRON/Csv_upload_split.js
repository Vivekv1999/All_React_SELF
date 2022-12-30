import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

export default function Csv_upload_split() {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));

  ////////
  const [input, setinput] = useState("")
  const [table, settable] = useState(false)
  const [value, setvalue] = useState([])
  const [splitpart, setsplitpart] = useState([])


  const nn = value[1]
  // console.log(nn, "aaaaaaaa");
  const Newfield = value[2]
  const number = value[3]

const inputnum=input.charAt(input.length-1)   //*&&&***--> aanathi have last index par string ni je charter hase te malse
const numinnum=parseInt(inputnum)




  const handleinputchnage = (e) => {
    setinput(e.target.value)
    setvalue(input.split(","))         ///--have jo ane setvalue ne ama set karavu to lat index onchage 6 atle te avati nathi
                                    ///parntu jo setvalue ane j biche handleclcok par karavu to badhi value ave parntu te ma inder na funca map menthod te bara bar nahi chlatu atlr ke value barabar set nathi thati 
  }

// console.log(splitpart,"mnmnmnmnmnmnnnhjnjk");


  const handleOnChangeee = () => {  
    const bb = []
    settable(true)
    headerKeys.map((val, index1) => {
      return val === nn ?
        array.map((item) => {

          const ff = Object.values(item)
          const ss = ff[index1]
          const finalval=ss.slice(0,numinnum)
          const asd = bb.push(finalval)
          
          console.log(bb)                              ///at ehr second time-->time consuming ***&&&***
          setsplitpart(bb)
          // const asd = bb.push(ss)
          // console.log(bb,"nummmm");           ////--time comsulming at here -me cosnole--asd so not sown correct value
          
        })

        :
        null
    })
  
  }




  return (
    <div style={{ textAlign: "center" }}>
      <h1>REACTJS CSV IMPORT EXAMPLE </h1>
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
      </form>

      <br />

      <input type="text" onChange={(e) => handleinputchnage(e)} />
      <button onClick={handleOnChangeee}>BBB</button>

      <table>
        <thead>
          <tr key={"header"}>
            {headerKeys.map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {array.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((val) => (
                <td>{val}</td>
              ))}

            </tr>
          ))}
        </tbody>
      </table>

      {table
        ?
        <table>
          <thead>
            <tr key={"header"}>
              {headerKeys.map((key) => (
                <th>{key}</th>
              ))}
              <th>{Newfield}</th>
            </tr>
          </thead>

          <tbody>
            {array.map((item,index) => (
              <tr key={item.id}>
                {Object.values(item).map((val) => (
                  <td>{val}</td>
                ))}
                <td>{splitpart[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        :
        null}
    </div>
  );
}
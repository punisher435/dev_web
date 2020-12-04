import React from "react"
import Card from '../components/Card'

// function CardList(props){
//     return (
//         <div>
//             <br></br>
//             <br></br>
//             <br></br>
//             <br></br>
//             <br></br>
//             <br></br>
//             <br></br>
//             <br></br>
//             <br></br>
            

//             <Card/>
//             <br></br>
//             <br></br>
//             <Card/>
//             <br></br>
//             <br></br>
//             <Card/>
//             <br></br>
//             <br></br>
//             <Card/>
//         </div>
//     )
// }

import { List} from 'antd';

const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
];

function CardList(){
    return (
        <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Card/>
          </List.Item>
        )}
      />
    )
}


export default CardList
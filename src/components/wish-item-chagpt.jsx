import React from 'react'
import { Col } from 'reactstrap';
import ReactStars from "react-rating-stars-component";
const TeaTypeImages = require.context('../assets/images/tea-types');
const TeaIcons = require.context('../assets/images/details/tea-icons');
export default function WishItemChagpt(props) {
  const {itemPercentX } = props
  const {src, id, assignedRating, teaName, assignedLevelChs, color} = props.item
  return (
    <Col
      xs="2"
      md="2"
      lg="2"
      className={`wish-item character mx-1 px-0`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '600px',
      }}>

      <div className="text-center text-wrap" style={{ fontSize: '3.0rem', color: color }}>{assignedLevelChs}</div>

      <div style={{
        backgroundImage: `url('${TeaTypeImages('./' + src).default}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        flex: '1',
      }}></div>
      <div className="text-center text-wrap" style={{ fontSize: '3.0rem'}}>{teaName}</div>
      <div className="text-center text-wrap" style={{ fontSize: '3.0rem', letterSpacing: '15px'}}>{integerToChineseString(id)}</div>
    </Col>

    // <Col
    // xs="2"
    // md="2"
    // lg="2"
    // style={{
    //   backgroundImage: `url('${TeaTypeImages('./' + src).default}')`,
    //   backgroundPositionX: itemPercentX+'%',
    //   height: '600px',
    // }}
    // className={`wish-item character mx-1 px-0`}>
    //   <div
    //   className="h-100 react-stars-container d-flex flex-column align-content-center justify-content-end pb-2">
    //     <div className="text-center text-wrap pb-1" style={{ fontSize: '3.0rem' }}>{teaName}</div>
    //     <div className="text-center text-wrap pb-1" style={{ fontSize: '3.0rem' }}>{integerToChineseString(id)}</div>
    //     <div className="text-center text-wrap pb-1" style={{ fontSize: '3.0rem', 'color': color}}>{assignedLevelChs}</div>
    //     {/* <ReactStars
    //       count={assignedRating}
    //       size={80}
    //       edit={false}
    //       color="#ffd700"
    //       classNames={"justify-content-center"}
    //     /> */}
    //   </div>
    // </Col>
  )
}

function integerToChineseString(num) {
  const chineseDigits = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  let chineseString = num.toString().split('').map(digit => chineseDigits[parseInt(digit)]).join('');

  // Pad with '〇' to make the string 3 characters long
  while (chineseString.length < 3) {
      chineseString = '〇' + chineseString;
  }

  return chineseString;
}

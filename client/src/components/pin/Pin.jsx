import { Link } from 'react-router-dom'
import './pin.scss'
import { Marker, Popup } from 'react-leaflet'

const Pin = ({item}) => {
  return (
    <Marker position={[item.postId.latitude, item.postId.longitude]}>
      <Popup>
        <div className="popupContainer">
            <img src={item.postId.images} alt="" />
            <div className="textContainer">
                <Link to={`/${item.postId.id}`}>{item.postId.title}</Link>
                <span className="bed">{item.postId.bedroom} bedroom</span>
                <b>${item.postId.price}</b>
            </div>
        </div>
      </Popup>
    </Marker>
  )
}

export default Pin
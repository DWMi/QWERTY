import LOGO from '../../public/QWERTYLOGO2.svg'
import Image from 'next/image'
import {ImFacebook, ImTwitter} from 'react-icons/im'
import {RiInstagramFill} from 'react-icons/ri'
import style from './Footer.module.css'

const Footer =()=>{

    return(

        <div className={style.footerCon}>
            <div className={style.box1Con}>
                <div className={style.box1}>
                    <Image src={LOGO}/>
                    <div style={{display:'flex' ,gap:'20px'}} >
                        <a href='https:\\www.facebook.com'>
                            <ImFacebook href='www.facebook.com'/>
                        </a>
                        <a href='https:\\www.twitter.com'>
                            <ImTwitter/>
                        </a>
                        <a href='https:\\www.instagram.com'>
                            <RiInstagramFill/>
                        </a>
                    </div>
                    <p style={{fontSize:'10px', color:'rgba(255, 255, 255, 0.514)'}}>Copyright © 2023 QWERTY | All Rights Reserved.</p>
                </div>
            </div>
            <div className={style.box2}>
                <p style={{fontWeight:'bold', color:'white'}}> Products </p>
                <br></br>
                <ul style={{listStyle:'none', display:'flex', gap:'8px', flexDirection:'column', color:'rgba(255, 255, 255, 0.514)'}}>
                    <li>
                        Keyboards
                    </li>
                    <li>
                        Switches
                    </li>
                    <li>
                        Keycaps
                    </li>
                    <li>
                        See All
                    </li>
                </ul>
            </div>
            <div className={style.box2}>
                <p style={{fontWeight:'bold', color:'white'}}> Shipping </p>
                <br></br>
                <ul style={{listStyle:'none', display:'flex', gap:'8px', flexDirection:'column', color:'rgba(255, 255, 255, 0.514)'}}>
                    <li>
                        Shipping Methods
                    </li>
                    <li>
                        Shipping Fees
                    </li>
                    <li>
                        Warehouse Location
                    </li>
                </ul>
            </div>
            <div className={style.box2}>
                <p style={{fontWeight:'bold', color:'white'}}> Contact Information </p>
                <br></br>
                <ul style={{listStyle:'none', display:'flex', gap:'8px', flexDirection:'column'}}>
                    <li>
                        123 Some Street, 41234, Göteborg, Sweden
                    </li>
                    <li>
                        0123456789
                    </li>
                    <li>
                        info@qwerty.com
                    </li>
                </ul>
            </div>
            <div>
                
            </div>

        </div>
    )
}


export default Footer
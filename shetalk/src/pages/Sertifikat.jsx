import React from 'react';
import { useState, useEffect } from 'react';
import '../css/sertif.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Logo from '../components/atoms/Logo';

function Sertifikat() {

    const [loader, setloader] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());

    // Download Sertifikat
    const downloadPDF = () => {
        const capture = document.querySelector('.content');
        setloader(true);
        html2canvas(capture).then((canvas)=>{
            const imgData = canvas.toDataURL('img/png');
            const doc = new jsPDF('l','mm', 'a4');
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
            setloader(false);
            doc.save('receipt.pdf');
        })
    }

    // Tanggal Sertifikat
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('id-ID', options);

    return (
    <div>
        {/* button download sertifikat*/}
        <div className="d-flex shadow-sm  px-md-5 py-md-2 px-2 py-2 bg-body-tertiary rounded">
            <button className='btn' style={{backgroundColor: '#47D0BD'}} onClick={downloadPDF} disabled={!(loader===false)} >
                {loader?(
                    <span>Downloading</span>
                ):(
                    <span>Download Sertifikat</span>
                )}
            </button>
        </div>

        {/*Sertifikat*/}
        <div className='content'>
            <div className='col' style={{paddingTop:'4rem'}}>
                <div className='row'  >
                    <div className='text-center' style={{paddingTop:'6rem'}}>
                        <Logo/>
                    </div>
                    <h3 className='text9'>SERTIFIKAT   PENGHARGAAN</h3>
                    <h5 className='text10'>Sertifikat ini diberikan kepada:</h5>
                </div>
                {/* Nama Ahli */}
                <div className='row'>
                    <h2 className='text-center' style={{paddingTop:'4rem', color: '#FF6565'}}>NAMA</h2>
                </div>
                <div className='row'>
                    <h5 className='text-center' style={{paddingTop:'2rem'}}>Sebagai <strong>pembicara</strong> pada program volunteer kesehatan di <strong>platform social media "SheTalk"</strong> </h5>
                    <h5 className='text-center'>dan telah berpartisipasi aktif dalam forum diskusi dengan tema <strong>“Kesehatan Seksual dan Reproduksi”</strong></h5>
                </div>
                {/* Tanggal Sertifikat*/}
                <div className='row'>
                    <h5 className='text-center' style={{paddingTop:'2rem'}}>
                        {formattedDate}
                    </h5>
                </div>
                {/* TTD Sertifikat */}
                <div className='row'>
                    <h6 className='text text-end' style={{paddingTop:'4rem', paddingRight:'12rem'}}>________________________</h6>
                    <h6 className='text text-end' style={{paddingTop:'1rem', paddingRight:'14rem'}}>SheTalk Team</h6>
                    <h6 className='text text-end' style={{paddingBottom:'4rem', paddingRight:'12rem'}}>Sosial Communities</h6>
                </div>
            </div>
        </div>
    </div>
    
    )
}

export default Sertifikat;
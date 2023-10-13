import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../assets/style.css'
import { ProcedurePdf } from "../../context/docs"

const Insrtuctions = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='main-body'>
        <div className='procedure'>
          <div className='DOCUMENTS' style={{ padding: '1rem 4rem 1rem 4rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem', width: '100%' }}>
            Guidelines to apply for Verification
            </h2>
            {/* insert horizontal line */}
            <hr style={{ width: '100%', marginBottom: '2rem' }} />
            <ol style={{ lineHeight: '1.7rem' }} type='i'>
              <li className='intro_li'>
                Any agency or Wce of bonafide student can apply for document verification such as grade cards, provisional pasing certificates or University degree certificates
              </li>
              <li className='intro_li'>
                The applicant has to submit the documents by using this verification portal.
              </li>
              <li className='intro_li'>
                Documents required for verification: Grade Cards, Provisional Certificate or University Degree Certificates.
              </li>
              <li className='intro_li'>
                <b>
                  The payment must be done online through net banking or UPI or cards.
                </b>
                <br />
                <u><i>Note - Payment using dd and check is prohibited.</i></u>
              </li>
              <li className='intro_li'>
              The applicant will receive verification letter on registered email id.
              </li>
              <li className='intro_li'>
                <b>
                  The fee for verification is Rs.900/-(Rupees Nine Hundred only)
                  per student.
                </b>
              </li>
            </ol>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <div className="button_next">
                <input type="submit" value="Next" onClick={() => navigate('/DocUploader')} />
              </div>
              {/* <div className='button_next'>
                <a href={ProcedurePdf.procedurePdf} target="_blank" ><button className="download_btn"><i class="fa fa-download"></i> Download</button></a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Insrtuctions

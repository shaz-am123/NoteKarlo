
export default function About() {
  return (
    <div className='container my-3' style={{'fontSize': "1.2rem"}}>
      <h1>About Us</h1>
      <div className="accordion" id="accordionExample" >
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button"  type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Our Services
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show"  aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body" >
              iNotebook tries to provide its users a reliable and efficient note taking mechanism. Create an account with us and leave your note keeping stress for us. You can save, delete and edit notes on your will.
            </div>
          </div>
        </div>
        <div className="accordion-item" >
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed"  type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Our Aim
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div className="accordion-body"  >
              iNotebook has started off as a note taking application, but we aim to grow its services into blogging and sharing thoughts with each other. Users in the future versions will be able to see each others blogs.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button className="accordion-button collapsed"  type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Security
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div className="accordion-body" >
              Our application provides a safe place for its users to keep their thoughts or notes. Your email addresses are safe with us and your passwords are encrypted with strong encryption.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

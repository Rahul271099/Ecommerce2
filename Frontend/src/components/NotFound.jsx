import React from 'react'
import "../style/NotFound.css"
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {

    const navigate = useNavigate();

  return (
    <section class="page_404">
	<div class="container">
		<div class="row">	
		<div>
		<div>
		<div class="four_zero_four_bg">
			<h1 class="text-center">404</h1>
		</div>
		
		<div class="contant_box_404">
		<h3 class="h2 text-center">
		Look like you're lost
		</h3>
		
		<p class="text-center">the page you are looking for not avaible!</p>
		
        <div class="text-center">
            <Button variant='warning' onClick={()=>{
                navigate("/home")
            }}>Go to Home</Button>
        </div>
	</div>
		</div>
		</div>
		</div>
	</div>
    </section>
  )
}

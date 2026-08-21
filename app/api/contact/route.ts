import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // Submit to CMS API
    const response = await fetch('http://localhost:5000/api/forms/forms/6a6b565da7b9dd810944fca1/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    })

    if (!response.ok) {
      throw new Error(`CMS API responded with status: ${response.status}`)
    }

    return NextResponse.json({ success: true, message: 'Form submitted successfully!' }, { status: 200 })
  } catch (error: any) {
    console.error('Error in contact route:', error)
    return NextResponse.json({ success: false, message: 'Failed to submit form.', error: error.message }, { status: 500 })
  }
}

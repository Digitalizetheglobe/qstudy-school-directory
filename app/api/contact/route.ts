import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // Support both { data: { ... } } and direct payload { ... }
    const payload = body?.data ? body.data : body

    // Submit to CMS API
    const response = await fetch('https://schooldirectorycms.qstudyworld.com/api/forms/forms/6a6b565da7b9dd810944fca1/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: payload }),
    })

    if (!response.ok) {
      const errText = await response.text().catch(() => '')
      throw new Error(`CMS API responded with status: ${response.status} ${errText}`)
    }

    return NextResponse.json({ success: true, message: 'Form submitted successfully!' }, { status: 200 })
  } catch (error: any) {
    console.error('Error in contact route:', error)
    return NextResponse.json({ success: false, message: 'Failed to submit form.', error: error.message }, { status: 500 })
  }
}

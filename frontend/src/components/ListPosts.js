import React from 'react'

export default function ListPosts () {
  return (
    <div className="w3-container">
      <table >
        <th className='w3-red'>All Posts
        <tr >
          <th>
            Title
          </th>
          <th>
            Author
          </th>
          <th>
            Age
          </th>
        </tr>
        </th>
        <tr>
          <td>
            Jill
          </td>
          <td>
            Smith
          </td>
          <td>
            50
          </td>
        </tr>
        <tr>
          <td>
            Eve
          </td>
          <td>
            Jackson
          </td>
          <td>
            94
          </td>
        </tr>
      </table>
    </div>
  )
}

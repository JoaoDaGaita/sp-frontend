import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table"
import axios from 'axios'
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { Link, useSearchParams } from "react-router-dom"

interface User {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export interface UserNextUrlProps {
  data: User[]
}

export function Users() {
  const [userList, setUserList] = useState<User[]>([])
  const [showViewMore, setShowViewMore] = useState("")
  const [searchParams] = useSearchParams()
  const [since, setSince] = useState(searchParams.get('since') || 0)

  async function fetchUsers() {
    const data =
      (await axios.get<User[]>(`https://sp-backend-axpv.onrender.com/api/users?since=${since}`)).data

    if (data.length === 0) {
      setShowViewMore("End of Repos")
    } else {
      setUserList([...userList, ...data])
      setSince(data[data.length - 1].id)
      setShowViewMore("Loading...")
    }

    return data
  }

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      fetchUsers()
    }
  }, [inView, fetchUsers])

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4 pb-10">
      <h1 className="text-4xl font-medium text-center">GITHUB USERS</h1>
      <div className="border-2 rounded-md border-slate-600">
        <Table className="pb-4">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Login</TableHead>
              <TableHead>Profile Url</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userList.map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    <Link to={`/details/${user.login}/${user.id}`}>
                      {user.login}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link to={user.html_url} target="_blank" rel="noopener noreferrer">
                      {user.html_url}
                    </Link></TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      <div className="m-auto flex items-center justify-center" ref={ref}>{showViewMore}</div>
    </div>
  )
}

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
      (await axios.get<User[]>(`http://localhost:3333/api/users?since=${since}`)).data

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
    <div className="p-6 max-w-5xl mx-auto space-y-4">
      <h1 className="text-4xl font-medium">USERS</h1>
      <div className="border-2 rounded border-slate-600">
        <Table>
          <TableHeader>
            <TableRow className="border-b-slate-600">
              <TableHead>ID</TableHead>
              <TableHead>Login</TableHead>
              <TableHead>Profile Url</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userList.map((user) => {
              return (
                <TableRow className="border-b-slate-600" key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell className="hover:text-slate-400">
                    <Link to={`http://localhost:5173/details/${user.login}/${user.id}`}>
                      {user.login}
                    </Link>
                  </TableCell>
                  <TableCell className="hover:text-slate-400">
                    <Link to={user.html_url}>
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

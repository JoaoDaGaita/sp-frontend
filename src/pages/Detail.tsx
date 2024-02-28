import { Card, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { format } from "date-fns"
import { Link, useParams } from "react-router-dom"

export interface User {
  login: string
  id: number
  avatar_url: string
  created_at: string
}

export interface Repos {
  id: number
  name: string
  html_url: string
}

export function Detail() {
  const params = useParams()

  const { data: user } = useQuery<User>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3333/api/users/${params.login}/details`)
      return response.data
    },
  })

  const { data: repositories, isFetching } = useQuery<Repos[]>({
    queryKey: ['repositories'],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3333/api/users/${params.login}/repos`)
      return response.data
    },
    staleTime: 1000 * 60
  })

  return (
    <div className="max-w-3xl flex flex-col items-center justify-center mx-auto pt-16 gap-10">
      <Card className="w-[450px] bg-slate-500 p-4">
        <CardTitle className="flex items-center justify-start">
          <img
            src={user?.avatar_url}
            width={80}
            height={80}
            className="rounded-full"
          />
          <CardContent>
            <p className="text-slate-800 text-lg">{user?.id}</p>
            <h4 className="text-white text-xl capitalize">{user?.login}</h4>
            {user &&
              <p className="text-slate-700 text-xl capitalize">{format(new Date(user?.created_at), "dd MMMM yyyy")}</p>
            }
          </CardContent>
        </CardTitle>
      </Card>

      <Table>
        <TableHeader className="border-2 solid border-slate-600">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Url repos</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="border-2 border-slate-600">
          {repositories?.map((repo) => {
            return (
              <TableRow key={repo.id}>
                <TableCell>{repo.id}</TableCell>
                <TableCell>{repo.name}</TableCell>
                <TableCell>
                  <Link to={repo.html_url} className="hover:text-slate-500" target="_blank" rel="noopener noreferrer">
                    {repo.html_url}
                  </Link>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {isFetching &&
        <div className="mx-auto flex flex-col items-center justify-center">
          <h1 className="text-slate-700 text-lg font-bold">Loading...</h1>
        </div>
      }
    </div>
  )
}

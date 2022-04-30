//빠르게 보기 

import { ReactQueryDevtools } from "react-query/devtools";
import {  useQuery } from "react-query";


export function Example() {
    const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
      fetch(
        "https://api.github.com/repos/tannerlinsley/react-query"
      ).then((res) => res.json())
    );
    if(isLoading) return (<div>...isLoading</div>)
    if(error) return "occurred error" + error.message;
    console.log(data,'data')
    return (
      
      <div>
        <h1>{data.name}</h1>
        <p>{data.description}</p>
        <strong>{data.subscribers_count}</strong>
        <strong>{data.stargazers_count}</strong>
        <strong>{data.forks_count}</strong>
        <div>{isFetching ? "updating..." : ""}</div>
        <ReactQueryDevtools initialIsOpen />
      </div>
    )
    
  }
//@설명
//data : 무한 쿼리 데이터 포함하는 개체
//data.pages : 가져온 페이지를 포함하는 배열
//data.pageParams : 페이지를 가져오는 데 사용되는 페이지 매게변수를 포함하는 배열
//fetchNextPage 및 fetchPreviousPage : 기능을 사용할 수 있다.
//getNextPageParam 및 getPreviousPageParam : 로드할 데이터가 더 있는지 여부를 가져오는 옵션도 사용하능하다 
//(fetchNextPage 또는 fetchPreviousPage 함수 선언할 때에 선택적으로 재정의 가능)
//hasNextPage : boolean 표현가능, if(getNextPageParam){true}else {undefined}
//isFetchingNextPage 및 is FetchingPreviousPage : 백그라운드 새로고침 상태와 추가로드 상태 구분 가능

//나의 쿼리에 초기데이터 또는 선택사항같은 옵션을 사용할 때, 데이터를 재구성할떄 data.pages 와 data.pageParams 가 여전히 속성이 포함되어있는지 확인해라!
//그렇지 않으면 return 되는 쿼리가 변경된 사항을 덮어쓴다.

//@무한스크롤예시 
//(이렇게 파람으로 페이지 넘버를 0으로 보내면 그 다음 페이지 넘버를 보내주는 api 가 있다고 가정하자
// 총 3 번의 데이터 페치가 가능한 상황 )
// fetch('/api/projects?pageNum=0')
// // {data: [...], nextPageNum : 3}
// fetch('/api/projects?pageNum=3')
// // {data: [...], nextPageNum : 6}
// fetch('/api/projects?pageNum=6')
// // {data: [...], nextPageNum : 9}
// fetch('/api/projects?pageNum=9')
// // {data: [...]}
import React from "react";
import { useInfiniteQuery } from "react-query";

function Project() {
    const fetchProjects = ({pageParam = 0}) => {
        fetch('/api/projects?pageNum=' + pageParam)
    };

    const {
        data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status 
    } = useInfiniteQuery('products', fetchProjects, {
        getNextPageParam: (lastPage, pages) => lastPage.netPageNum,
    });

    return status === "loading" ? (
        <p>로딩중 ...</p>
    ) : status === "error" ? (
        <p>에러 : {error.message}</p>
    ) : (
        <>
            {data.pages.map((group, i) => (
                <React.Fragment key={i}>
                    {group.projects.map(project => (
                        <p key={project.id}>{project.name}</p>
                    ))}    
                </React.Fragment>
            ))}
            <div>
                <button
                onClick={fetchNextPage}
                disabled={!hasNextPage || isFetchingNextPage}        
                >
                    {isFetchingNextPage
                    ? '더 로딩중..'
                    : hasNextPage 
                    ? '더 로드중..'
                    : '로드될것이 더 없다.'
                    }                    
                </button>
            </div>
            <div>{isFetching && !isFetchingNextPage ? 'fetching...' : null}</div>
        </>
    )
}

//@만약 infinite query 를 리패치 해야하는 상황에서는 어떻게 하나?
//무한 쿼리 stale 다시 가져와야 sequntially 하는 경우 첫번째 그룹부터 시작해 각 그룹을 가져오다. 
//이렇게 하면 기본 데이터가 변경되더라도 오래된 pagenum을 사용하지 않고 잠재적으로 중복을 가져오거나 기록을 건너 뛰지 않게 된다.
//무한 쿼리의 결과가 (queryCache)쿼리 캐시에서 제거되면 페이지 매김은 요청된 초기그룹만 있는 초기상태에서 다시 시작된다.

const {refect} =useInfiniteQuery('projects', fetchProjects, {
    getNextPageParam: (lastPage, pages)=> lastPage.nextPageNum,
})
//오직 첫번째 페이지가 리페치 된다.
refetch({refetchPage: (page, index) => index === 0})
//(queryFilters) 의 일부로 queryClient.refetchQueries, queryClient.invalidateqeuries 또는 queryClient.resetQueries의 이 함수를 두번째 인수에 전달가능
// refetchPage:(page:data, index:number, allPages:data[]) => boolean

//@내 쿼리 함수에 사용자의 지정 정보르 전달해야하는 경우는 어떻게 하나?

//@양방향 무한 목록을 구현하려면 어떻게 해야하나? 

//페이지를 역순으로 표시하려면 어떻게 해야하나?

//무한쿼리를 수동으로 업데이트를 하려면 어떻게 해야하나?

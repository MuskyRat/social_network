import React, { Suspense } from "react";
import style from './withSuspense.module.css';


export function withSuspense<WCP> (WrappedComponent: React.ComponentType<WCP>) {
    return (props: WCP) => {
        return <Suspense fallback={<div className={style.wrapper}>...Loading</div>}>
            <WrappedComponent {...props} />
        </Suspense>
    };
}
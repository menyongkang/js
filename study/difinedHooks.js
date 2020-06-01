function useEventCallback(fn, dependencies) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current = fn;
  }, [fn, ...dependencies]);

  return useCallback(() => {
    const fn = ref.current;
    return fn();
  }, [ref]);
}

// 当 fn 回调函数变化时， ref.current 重新指向最新的 fn 这个逻辑中规中矩。

// 重点是，当依赖 dependencies 变化时，也重新为 ref.current 赋值，此时 fn 内部的 dependencies 值是最新的.
// 又仅执行一次（ref 引用不会改变），所以每次都可以返回 dependencies 是最新的 fn，并且 fn 还不会重新执行。

// 假设我们对 useEventCallback 传入的回调函数称为 X，则这段代码的含义，就是使每次渲染的闭包中，回调函数 X 总是拿到的总是最新 Rerender 闭包中的那个，所以依赖的值永远是最新的，而且函数不会重新初始化。
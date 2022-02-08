interface File {
  name: string,
  icon: string,
  content: SourceData,
  id: string,
}

const filePicker = (): Promise<File> => {};

const apiUpload = (file: File): Axios => {};

const useRerender = () => {
  const [, rerender] = useState(null);
  return () => rerender({});
}

function Uploader () {
  const rerender = useRerender();
  const instance = useRef({
    list: new Set(),
    timer: null,
  });
  const { list } = instance.current;
  const upload = useCallback(async () => {
    const file = await filePicker();
    if ([...list].find(item => item.id === file.id)) {
      toast('file already uploading');
      return;
    }
    const request = apiUpload(file);
    list.add({
      file,
      id: file.id,
      name: file.name,
      request,
      progress: 0,
    })
    if (instance.current.timer === null) {
      instance.current.timer = setInterval(() => {
        list.forEach((item) => {
          item.progress = item.request.progress;
        });
        rerender();
      }, 1000);
    }
  }, []);
  const cancel = useCallback(async (id) => {
    const item = [...list].find(item => item.id === id);
    item.request.cancel()
      .then(() => {
        list.remove(item);
        if (list.size === 0) {
          clearInterval(instance.current.timer);
          instance.current.timer = null;
        }
      });
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(instance.current.timer);
    };
  }, [])

  return (<div>
    <button onClick={() => { upload(); }}>upload</button>
    {[].map.call(instance.current.list, (item) => {
      return <div key={item.id}>
        <div className="name">{item.name}</div>
        <img className="icon" src={item.icon} />
        <div className="progress">{item.progress}</div>
        <button className="cancel" onClick={() => { cancel(item.id) }}> cancel </button>
      </div>
    })}
  </div>)
}
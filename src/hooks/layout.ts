import { useAppStore } from "@/stores";

export function useGetElementById(id: string) {
  const [container, setContainer] = useState<HTMLElement | null>();
  const { isMobile } = useAppStore();

  useEffect(() => {
    const target = document.getElementById(id);
    setContainer(target);
  }, [isMobile]);

  return container;
}
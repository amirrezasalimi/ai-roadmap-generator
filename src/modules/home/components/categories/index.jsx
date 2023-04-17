import Link from "next/link";
import Image from "next/image";
import {useEffect} from "react";
import ComponentWithStyle from "./styles";
import {LINKS} from "@/shared/constants/links";
import {Card, Loading, Row, Text} from "@nextui-org/react";
import useGetCategories from "@/shared/hooks/get-categories";
import Button from "@/shared/components/button";
import CategoryCard from "./components/category-card";

const Categories = () => {
    const hookGetCategories = useGetCategories();
    useEffect(()=> {
        hookGetCategories.action();
    },[]);

    return (
        <ComponentWithStyle>
            <Card className={"card"}>
                <Row align={"center"} justify={"space-between"}>
                    <Text b size={16} weight={"800"}>
                        Categories
                    </Text>
                    <Link href={LINKS.CATEGORIES}>
                        <Button color={"default"} bordered>
                            <Image className={"seeAll"} alt="see all" height={20} width={20} src={'/eye.svg'} />
                            See All
                        </Button>
                    </Link>
                </Row>
                <div className={"list"}>
                    {
                        hookGetCategories.status === "loading" &&
                        <Row justify={"center"}>
                            <Loading color={"secondary"}/>
                        </Row>
                    }
                    {
                        hookGetCategories.status === "done" &&
                        hookGetCategories?.data?.map((item)=> (
                            <CategoryCard data={item} />
                        ))
                    }

                </div>
            </Card>
        </ComponentWithStyle>
    )
};
export default Categories;

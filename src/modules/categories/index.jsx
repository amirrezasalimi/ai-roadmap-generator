import ComponentWithStyle from "./styles";
import {Grid, Row, Spacer, Text} from "@nextui-org/react";
import Logo from "@/shared/components/logo";
import Button from "@/shared/components/button";
import Image from "next/image";
import {useRouter} from "next/navigation";
import CategoryCard from "./components/category-card";
const Categories = () => {
  const router = useRouter();
  const backEvent = () => {
      router.back()
  }
  return (
    <ComponentWithStyle md>
      <Spacer y={2} />
      <Row justify={'center'}>
        <Logo size={"lg"} />
      </Row>
      <Spacer y={2} />
      <Row align={"center"}>
          <Button onClick={backEvent} className={"backButton"} color={"default"} bordered>
              <Image className={"icon"} alt="back" height={25} width={25} src={'arrow-left.svg'} />
          </Button>
          <Text className={"title"}>
              Categories
          </Text>
      </Row>
      <Spacer y={2} />

      <Grid.Container gap={2} justify="center">
          <Grid xs={6} sm={4} md={2.4} lg={2}>
              <CategoryCard />
          </Grid>
          <Grid xs={6} sm={4} md={2.4} lg={2}>
              <CategoryCard />
          </Grid>
          <Grid xs={6} sm={4} md={2.4} lg={2}>
              <CategoryCard />
          </Grid>
          <Grid xs={6} sm={4} md={2.4} lg={2}>
              <CategoryCard />
          </Grid>
          <Grid xs={6} sm={4} md={2.4} lg={2}>
              <CategoryCard />
          </Grid>
          <Grid xs={6} sm={4} md={2.4} lg={2}>
              <CategoryCard />
          </Grid>
          <Grid xs={6} sm={4} md={2.4} lg={2}>
              <CategoryCard />
          </Grid>
          <Grid xs={6} sm={4} md={2.4} lg={2}>
              <CategoryCard />
          </Grid>
          <Grid xs={6} sm={4} md={2.4} lg={2}>
              <CategoryCard />
          </Grid>
          <Grid xs={6} sm={4} md={2.4} lg={2}>
              <CategoryCard />
          </Grid>
          <Grid xs={6} sm={4} md={2.4} lg={2}>
              <CategoryCard />
          </Grid>
          <Grid xs={6} sm={4} md={2.4} lg={2}>
              <CategoryCard />
          </Grid>
      </Grid.Container>

    </ComponentWithStyle>
  )
};
export default Categories;

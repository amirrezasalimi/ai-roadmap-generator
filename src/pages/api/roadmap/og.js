
export default function (req) {
    const title = `${req.query.title}`.slice(0, 10);
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 128,
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {title}
            </div>
        ),
        {
            width: 1200,
            height: 600,
        },
    );
}
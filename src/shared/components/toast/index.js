import { useSnackbar } from 'notistack';

let useSnackbarRef
export const SnackbarUtilsConfigurator = () => {
    useSnackbarRef = useSnackbar();
    return null
}

export default {
    close: (key) => {
        useSnackbarRef.closeSnackbar(key)
    },
    success(msg) {
        return this.toast(msg, 'success')
    },
    warning(msg) {
        return this.toast(msg, 'warning')
    },
    info(msg) {
        return this.toast(msg, 'info')
    },
    error(msg) {
        return this.toast(msg, 'error')
    },
    toast(msg, variant = 'default', options = null) {
        return useSnackbarRef.enqueueSnackbar(msg, {
            autoHideDuration: 3000,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
            },
            variant,
            ...options
        })
    }
}
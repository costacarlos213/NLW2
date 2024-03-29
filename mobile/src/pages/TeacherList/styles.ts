import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f7'
    },
    teacherList: {
        marginTop: -40,
        
    },
    searchForm: {
        marginBottom: 8,
    },

    label: {
        color: '#c4c2ff',
        fontFamily: 'Poppins_400Regular'
    },

    input: {
        height: 54,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 16,
        marginTop: 4,
        marginBottom: 16,
    },

    inputGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    inputBlock: {
        width: '48%'
    },

    submitButton: {
        backgroundColor: '#04d361',
        flexDirection: "row",
        height: 42,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 6,
    },

    submitButtonText: {
        color: '#fff',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14
    }
})

export default styles